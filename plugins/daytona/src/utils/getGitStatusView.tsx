/*
 * Copyright 2023 The Kubin Kloud Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";

/**
 * Returns the Git status view of the Codespace compared the reference branch
 * in the format of ahead/behind
 * @param props - the argument with ahead and behind value
 * @returns a React JSX element with Commit Status in the format ahead/behind
 */
export const getGitStatus = (props: {
    ahead?: number;
    behind?: number;
}) => {
    return (
      <>
        {getGitStatusView(props)}
      </>
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
  export function getGitStatusView({
    ahead,
    behind
  }: {
    ahead?: number;
    behind?: number;
  }) {
    if (ahead === undefined || behind === undefined) return null;
    const answer = `${ahead}/${behind}`;
    return answer;
  }
  