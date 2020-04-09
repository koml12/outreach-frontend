import React from "react";

import Link from "@material-ui/core/Link";

const ResumeInfo = (props) => {
  const { url } = props;

  return (
    <Link href={url} target="_blank">
      View Resume
    </Link>
  );
};

export default ResumeInfo;
