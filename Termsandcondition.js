import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";

import { makeStyles } from "@material-ui/core/styles";
import {
  ServerURL,
  postDataAndImage,
  getData,
  postData,
} from "./FetchNodeServices";
import { isBlank } from "./Checks";
import renderHTML from "react-render-html";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    padding: 20,
    width: 750,
    marginTop: 20,
    background: "#fff",
  },
  input: {
    display: "none",
  },
}));
export default function Termsandcondition(Props) {
  const classes = useStyles();

  const [conditioned, setconditioned] = useState("");
  Termsandcondition.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Termsandcondition.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]



  const handleClick = async () => {
    var error = false;
    var msg = "<div>";

    if (isBlank(conditioned)) {
      error = true;
      msg +=
        "<font color='#b2bec3'><b>conditioned Should not be blank...</b></font><br>";
    }

    msg += "</div>";
    if (error) {
      swalhtml(renderHTML(msg));
    } else {
      var formData = new FormData();

      formData.append("conditioned", conditioned);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "terms/addconditioned",
        formData,
        config
      );

      if (result) {
        swal({
          title: "Data Submitted Successfully",
          icon: "success",
          dangerMode: true,
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontweight: 700,
                letterSpacing: 2,
                padding: 20,
              }}
            >
              Terms & Conditions
            </div>
          </Grid>

          
<Grid item xs={12}>
<ReactQuill value={conditioned}
     modules={Termsandcondition.modules}
     formats={Termsandcondition.formats}

                  onChange={(value) => setconditioned(value)} />
</Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleClick()}
              fullWidth
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button fullWidth variant="contained" color="primary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
