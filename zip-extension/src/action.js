async function exportAsZip({ servicesManager }) {
    console.log('servicesManager:',servicesManager)
    console.log('export clicked');
    const { viewportGridService, displaySetService } = servicesManager.services;

    // Get active viewport
    const { activeViewportId, viewports } = viewportGridService.getState();
    const activeViewport = viewports.get(activeViewportId);

    if (!activeViewport || !activeViewportId) {
      alert('No active viewport');
      return;
    }

    let displaySetInstanceUID;
    if (Array.isArray(activeViewport.displaySetInstanceUIDs)) {
      displaySetInstanceUID = activeViewport.displaySetInstanceUIDs[0];
    } else {
      displaySetInstanceUID = (activeViewport).displaySetInstanceUID;
    }

    if (!displaySetInstanceUID) {
      alert('No displaySetInstanceUID found for the active viewport');
      return;
    }

    // Get display set and metadata
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    const { PatientName, StudyDate } = (displaySet) || {};

    // Get image as JPEG
    const element = document.querySelector(
      `[data-viewport-uid="${activeViewportId}"] canvas`
    );
    if (!element) {
      alert('Could not find viewport canvas');
      return;
    }

    const imageBlob = await new Promise<Blob>((resolve, reject) => {
      element.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/jpeg');
    });

    // Prepare metadata
    const metadata = {
      PatientName: PatientName || 'Unknown',
      StudyDate: StudyDate || 'Unknown',
    };

    // Create zip
    const JSZip = (await import('jszip')).default;
    const { saveAs } = (await import('file-saver')).default;
    const zip = new JSZip();
    zip.file('image.jpg', imageBlob);
    zip.file('metadata.json', JSON.stringify(metadata, null, 2));
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Download
    saveAs(zipBlob, 'report.zip');
};

export default exportAsZip;
