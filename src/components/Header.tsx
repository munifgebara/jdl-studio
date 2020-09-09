import React, { useState } from "react";
import { connect } from "react-redux";
import LineIcon from "react-lineicons";
import logo from "../resources/logo-jhipster.png";
import { IRootState } from "../Store";
import { changeJdl } from "./JhOnlineReducer";
import { setSidebar, setCode, setDefaultCode } from "./studio/StudioReducer";
import { UploadPopup, ResetPopup, WarningPopup } from "./Popups";
import {
  downloadFile,
  goToJHipsterOnline,
  goToManageJdls,
  downloadImage,
} from "./Utils";

export interface IHeaderProp extends StateProps, DispatchProps {}

export function Header({
  code,
  isStorageReadOnly,
  jhonline,
  changeJdl,
  setSidebar,
  setCode,
  setDefaultCode,
}: IHeaderProp) {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [discardPopup, setDiscardPopup] = useState(false);
  const toggleSidebar = (page: string) => () => {
    setSidebar(page);
  };
  const confirmCreateNewJdl = () => {};
  const openUploadDialog = () => {
    setUploadPopup(true);
  };
  const closeUploadDialog = () => {
    setUploadPopup(false);
  };

  const confirmDiscardCurrentGraph = () => {
    setDiscardPopup(true);
  };
  const closeDiscardDialog = () => {
    setDiscardPopup(false);
  };

  const downloadJDL = (evt) => {
    downloadFile(evt, code);
  };

  return (
    <>
      <header>
        <div className="tools left">
          <a
            href="https://www.jhipster.tech/"
            title="JHipster website"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-img"
          >
            <img className="jhi-logo" src={logo} alt="JHipster logo" />
          </a>
          <a
            className="logo link"
            onClick={toggleSidebar("about")}
            title="About JDL-Studio"
          >
            JDL-Studio
          </a>
        </div>
        {isStorageReadOnly ? (
          <span className="storage-status" ng-show="isStorageReadOnly">
            View mode, changes are not saved.
            <a
              // onClick="app.saveViewModeToStorage()"
              title="Save this diagram to localStorage"
              className="link"
            >
              save
            </a>
            <a
              // onClick="app.exitViewMode()"
              title="Discard this diagram"
              className="link"
            >
              close
            </a>
          </span>
        ) : null}
        <div className="tools right">
          {jhonline.insideJhOnline && !jhonline.authenticated ? (
            <a
              id="signin"
              className="link"
              onClick={goToJHipsterOnline}
              title="Sign in"
            >
              Please sign in for more features!
            </a>
          ) : null}
          {!jhonline.insideJhOnline ? (
            <a
              id="signin"
              href="https://start.jhipster.tech/jdl-studio/"
              title="Go to new JDL Studio with more features"
            >
              Go to new JDL Studio
            </a>
          ) : null}
          {jhonline.authenticated ? (
            <>
              <a title="Logged in as" className="link">
                {jhonline.username}
              </a>

              <select
                className="jdl-select"
                value={jhonline.jdlId}
                onChange={changeJdl}
              >
                <option value="">&lt;Create new JDL Model&gt;</option>
                {jhonline.jdls.map((jdl) => (
                  <option value={jdl.id}>{jdl.name}</option>
                ))}
              </select>
              {jhonline.startLoadingFlag ? (
                <a>
                  <LineIcon name="sync" />
                </a>
              ) : (
                <a
                  title="Save JDL"
                  className="link"
                  onClick={confirmCreateNewJdl}
                >
                  <LineIcon name="file-add" />
                </a>
              )}
              <a onClick={goToManageJdls} className="link" title="Manage JDLs">
                <LineIcon name="cog" />
              </a>
            </>
          ) : null}
          {jhonline.insideJhOnline ? (
            <a
              className="link"
              onClick={goToJHipsterOnline}
              title="Go to the main JHipster Online page"
            >
              <LineIcon name="home" />
            </a>
          ) : null}

          <span className="seperator">
            <i className="lineIcon">|</i>
          </span>
          <a
            onClick={toggleSidebar("about")}
            title="About JDL-Studio"
            className="link"
          >
            <LineIcon name="question-circle" />
          </a>
          <a
            onClick={toggleSidebar("reference")}
            title="Language reference"
            className="link"
          >
            <LineIcon name="book" />
          </a>
          <a
            id="savebutton"
            download="app-jdl.png"
            className="link"
            title="Download snapshot of this diagram"
            onClick={downloadImage}
          >
            <LineIcon name="camera" />
          </a>
          <a
            id="saveTextbutton"
            download="app.jdl"
            title="Download this JDL source"
            className="link"
            onClick={downloadJDL}
          >
            <LineIcon name="download" />
          </a>
          <a
            id="uploadbutton"
            className="upload-dialog link"
            title="Import text file of a JDL"
            onClick={openUploadDialog}
          >
            <LineIcon name="upload" />
          </a>
          <a
            onClick={confirmDiscardCurrentGraph}
            title="Discard this diagram"
            className="link"
          >
            <LineIcon name="trash" />
          </a>
          <span id="tooltip"></span>
        </div>
      </header>
      <UploadPopup
        open={uploadPopup}
        closeModal={closeUploadDialog}
        setCode={setCode}
      />
      <ResetPopup
        open={discardPopup}
        closeModal={closeDiscardDialog}
        discardCurrentGraph={setDefaultCode}
      />
      <WarningPopup open={!jhonline.insideJhOnline} />
    </>
  );
}

const mapStateToProps = ({ studio, jhonline }: IRootState) => ({
  code: studio.code,
  isStorageReadOnly: studio.isStorageReadOnly,
  jhonline: jhonline,
});

const mapDispatchToProps = {
  changeJdl,
  setSidebar,
  setCode,
  setDefaultCode,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);