import React from "react";
import { getUnfollowLogForDisplay } from "../utils/utils";
import { State } from "../model/state";

interface UnfollowingProps {
  state: State;
  handleUnfollowFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setState: (state: State) => void;
}

export const Unfollowing = (
  {
    state,
    handleUnfollowFilter,
    setState,
  }: UnfollowingProps) => {

  if (state.status !== "unfollowing") {
    return null;
  }

  return (
    <section className="flex">
      <aside className="app-sidebar">
        <menu className="flex column grow m-clear p-clear">
          <p>Filter</p>
          <label className="badge m-small">
            <input
              type="checkbox"
              name="showSucceeded"
              checked={state.filter.showSucceeded}
              onChange={handleUnfollowFilter}
            />
            &nbsp;Succeeded
          </label>
          <label className="badge m-small">
            <input
              type="checkbox"
              name="showFailed"
              checked={state.filter.showFailed}
              onChange={handleUnfollowFilter}
            />
            &nbsp;Failed
          </label>
        </menu>
      </aside>
      <article className="unfollow-log-container">
        {state.unfollowLog.length === state.selectedResults.length && (
          <>
            <hr />
            <div className="fs-large p-medium clr-green">All DONE!</div>
            <button
              className="button-secondary"
              style={{ margin: '0.5rem 1rem' }}
              onClick={() => {
                const successfulIds = new Set(
                  state.unfollowLog
                    .filter(e => e.unfollowedSuccessfully)
                    .map(e => e.user.id)
                );
                setState({
                  status: 'scanning',
                  page: 1,
                  searchTerm: '',
                  currentTab: 'non_whitelisted',
                  percentage: 100,
                  results: state.results.filter(u => !successfulIds.has(u.id)),
                  whitelistedResults: state.whitelistedResults,
                  selectedResults: [],
                  filter: {
                    showNonFollowers: true,
                    showFollowers: false,
                    showVerified: true,
                    showPrivate: true,
                    showWithOutProfilePicture: true,
                    sortOrder: 'alphabetical',
                  },
                });
              }}
            >
              Back to Results
            </button>
            <hr />
          </>
        )}
        {getUnfollowLogForDisplay(state.unfollowLog, state.searchTerm, state.filter).map(
          (entry, index) =>
            entry.unfollowedSuccessfully ? (
              <div className="p-medium" key={entry.user.id}>
                Unfollowed
                <a
                  className="clr-inherit"
                  target="_blank"
                  href={`../${entry.user.username}`}
                  rel="noreferrer"
                >
                  &nbsp;{entry.user.username}
                </a>
                <span className="clr-cyan">
                  &nbsp; [{index + 1}/{state.selectedResults.length}]
                </span>
              </div>
            ) : (
              <div className="p-medium clr-red" key={entry.user.id}>
                Failed to unfollow {entry.user.username} [{index + 1}/
                {state.selectedResults.length}]
              </div>
            ),
        )}
      </article>
    </section>
  );
};
