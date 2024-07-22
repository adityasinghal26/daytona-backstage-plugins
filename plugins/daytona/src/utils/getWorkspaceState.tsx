import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from "@backstage/core-components";
import React from "react";
import { State } from "../types";


/**
 * Method to create an indicator that gives -
 * colored dot paired with Workspace state text
 * @param props - Properties with the Workspace state
 * @returns a dot icon with the Workspace state text
 */
export const getWorkspaceState = (props: {
  status?: State;
}) => {
  return (
    <>
      <StateIcon {...props} />
      {getStateDescription(props)}
    </>
  );
};

/**
 * Gives a dot icon on different Workspace states
 * @param status for Workspace state  
 * @returns a colored indicator for the state
 */
export function StateIcon({
  status,
}: {
  status?: State;
}) {
  if (status === undefined) return null;
  switch (status) {
    case State.none:
        return <StatusWarning />;

    case State.initializing:
        return <StatusWarning />;

    // Archive States
    case State.pendingArchive:
        return <StatusPending />;
    
    case State.archiving:
        return <StatusWarning />;
        
    case State.archived:
        return <StatusAborted />;

    // Create States
    case State.pendingCreate:
        return <StatusPending />;

    case State.creating:
        return <StatusWarning />;
    
    case State.created:
        return <StatusOK />;

    // Restore States
    case State.pendingRestore:
        return <StatusPending />;

    case State.restoring:
        return <StatusWarning />;
    
    case State.restored:
        return <StatusOK />;

    // Stop States
    case State.pendingStop:
        return <StatusPending />;

    case State.stopping:
        return <StatusWarning />;
    
    case State.stopped:
        return <StatusAborted />;

    // Start States
    case State.pendingStart:
        return <StatusPending />;

    case State.starting:
        return <StatusRunning />;
    
    case State.started:
        return <StatusOK />;

    // Destroy States
    case State.pendingDestroy:
        return <StatusPending />;

    case State.destroying:
        return <StatusWarning />;
    
    case State.destroyed:
        return <StatusAborted />;

    case State.error:
      return <StatusError />;

    default:
      return <StatusPending />;
  }
}

/**
   * Gives the text output on different Workspace state
   * @param status for Workspace state 
   * @returns a text with the Workspace state
   */
export function getStateDescription({
  status,
}: {
  status?: State;
}) {
  if (status === undefined) return null;
  switch (status) {
    case State.none:
        return 'None';

    case State.initializing:
        return 'Initializing';

    // Archive States
    case State.pendingArchive:
        return 'Pending Archive';
    
    case State.archiving:
        return 'Archiving';
        
    case State.archived:
        return 'Archived';

    // Create States
    case State.pendingCreate:
        return 'Pending Create';

    case State.creating:
        return 'Creating';
    
    case State.created:
        return 'Created';

    // Restore States
    case State.pendingRestore:
        return 'Pending Restore';

    case State.restoring:
        return 'Restoring';
    
    case State.restored:
        return 'Restored';

    // Stop States
    case State.pendingStop:
        return 'Pending Stop';

    case State.stopping:
        return 'Stopping';
    
    case State.stopped:
        return 'Stopped';

    // Start States
    case State.pendingStart:
        return 'Pending Start';

    case State.starting:
        return 'Starting';
    
    case State.started:
        return 'Started';

    // Destroy States
    case State.pendingDestroy:
        return 'Pending Destroy';

    case State.destroying:
        return 'Destroying';
    
    case State.destroyed:
        return 'Destroyed';

    case State.error:
      return 'Error';

    default:
      return 'Pending';
  }

}