"use strict"
//Move photo functionality
// Variables
let ApiKey = null;//need from google/company //Has to be different from Auth.js version
let moveBtn = document.getElementById('movePhoto');
let OCR = null; //need OCR photo format data from company for jpg, I couldn't find it online =(
  //OCR is for handling text in images if you want to print it out as a caption or not. I think you can
  //just remove it from the request http if that's a problem.
let revisionBoolean = true; //lets people read/write data after logging into google.
let teamDrivesBoolean = false; //if team drives is used.
let indexableTextBoolean = true; //seems to take photo name and use it as sorting.
// creates request object targeting the params we want to change to move photos ((and eventually other things if we continue working on this))
let createGoogleReqObj = (designerName, photoName) => {
// promises are love, promises are life, learn promises or face the wrath of confusing multi-line callbacks.
  return new Promise(function(resolve, reject){
    let reqObj = {
      name: photoName,
      uploadType: 'media',//(don't think we need but might) if media doesn't work go to https://developers.google.com/drive/api/v3/reference/files/update
      addParents: designerName
    }
    console.log(`reqObj after createGoogleReqObj runs.`, reqObj);
    resolve(reqObj)
    .catch((err)=>{
      console.log(`err in createGoogleReqObj`, err);
      reject(err);
    });
  });
};

//takes the created request object and sends it to google drive
let movePhotoObj = () => {
  createGoogleReqObj(document.getElementById('designerName').value, document.getElementById('photoName').value)
    .then((photoUpdate) => {
      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: `https://www.googleapis.com/drive/v3/files/${photoUpdate.name}?addParents=${photoUpdate.addParents}&keepRevisionForever=${revisionBoolean}&ocrLanguage=${OCR}&supportsTeamDrives=${teamDrivesBoolean}&useContentAsIndexableText=${indexableTextBoolean}&fields=appProperties%2Ccapabilities(canAddChildren%2CcanChangeViewersCanCopyContent%2CcanComment%2CcanCopy%2CcanDelete%2CcanDownload%2CcanEdit%2CcanListChildren%2CcanMoveItemIntoTeamDrive%2CcanMoveTeamDriveItem%2CcanReadRevisions%2CcanReadTeamDrive%2CcanRemoveChildren%2CcanRename)&key=${ApiKey}`,
        type: 'PATCH',
        data: JSON.stringify({ description: "photo update" }),
        success: function (response, textStatus, jqXhr) {
          console.log("Photo Successfully Patched! Designer Updated");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // log the error to the console
          console.log(`The following error occured: ${textStatus}`, errorThrown);
        },
        complete: function () {
          console.log("Photo Designer Update Ran");
        }
      });
    })
};
//this controls the move button firing the referenced function movePhotoObj. Keep movePhotoObj a reference or it fires immediately on page load.
moveBtn.addEventListener('click', movePhotoObj);

// function tests if the button works
let testButton = (designerFolder, photoFile) => {
  console.log(`testbutton fired`);
  console.log(`button values`, document.getElementById('designerName').value, document.getElementById('photoName').value);
};
//uncomment below to test move button.
// moveBtn.addEventListener('click', testButton); 


