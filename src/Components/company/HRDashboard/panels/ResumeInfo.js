import React from "react";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const ResumeInfo = (props) => {
  const { url } = props;

  return (
    <Link href={url} target="_blank">
      <Typography variant="body1">View Resume</Typography>
    </Link>
  );
};

export default ResumeInfo;
