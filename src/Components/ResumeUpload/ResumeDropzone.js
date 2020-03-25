import React, { useMemo } from "react";
import Dropzone from "react-dropzone";

const ResumeDropzone = props => {
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
  };

  const style = useMemo(() => ({ ...baseStyle }));

  const onDrop = files => {
    props.onDrop(files);
  };

  const getDropzoneText = () => {
    return props.filename !== null ? props.filename : "Drag and drop a PDF resume, or click to select a file.";
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>{getDropzoneText()}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ResumeDropzone;
