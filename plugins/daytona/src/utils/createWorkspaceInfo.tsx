import { Box, Link } from "@material-ui/core";
import React from "react";

/**
 * Returns the Git status view of the Codespace compared the reference branch
 * in the format of ahead/behind
 * @param props - the argument with ahead and behind value
 * @returns a React JSX element with Commit Status in the format ahead/behind
 */
export const createWorkspaceInfo = (props: {
    name?: string;
    domain?: string;
    team?: string;
}) => {
  const { name, domain, team } = props;
  const url = `https://${name}.${domain}`
  
  return (
    <Box alignItems="center">
      {loadUrl({name, url})}
      <span style={{display: 'flex', font: 'unset', marginTop: '1%', color: 'inherit'}}>
        {team}
      </span>
    </Box>
  );
};

/**
* Returns the Git status of the Codespace compared the reference branch
* in the format of ahead/behind
* where, ahead - number of commits the Codespace is ahead of the reference branch
* and, behind - number of commits the Codespace is behind of the reference branch
* @param props - the argument with ahead and behind value
* @returns the value with Commit Status in the format ahead/behind
*/
function loadUrl({
    name,
    url
  }: {
    name?: string;
    url?: string;
  }) {
      const urlObject = url ? (
          <Link
            href={`${url}`}
            target="_blank"
            rel="noopener">
            {name}
          </Link>
        ) : (name);
  
      return urlObject;
  }
  