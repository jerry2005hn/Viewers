import fileSaver from 'file-saver';
import { Button } from '@ohif/ui-next';
import { useSystem } from '@ohif/core/src';
import React from 'react';

export default function TestComponent() {
  const { servicesManager } = useSystem();
  const handleExport = async () => {
    if (!servicesManager) {
      alert('servicesManager is not available');
      return;
    }
    const { viewportGridService, displaySetService } = servicesManager.services;

    // Get active viewport
    const { activeViewportId, viewports } = viewportGridService.getState();
    console.log('activeViewportId:', activeViewportId);
    console.log('viewports:', viewports);
    const activeViewport = viewports.get(activeViewportId);
    console.log('activeViewport:', activeViewport);

    if (!activeViewport || !activeViewportId) {
      alert('No active viewport');
      return;
    }

    let displaySetInstanceUID;
    if (Array.isArray(activeViewport.displaySetInstanceUIDs)) {
      displaySetInstanceUID = activeViewport.displaySetInstanceUIDs[0];
    } else {
      displaySetInstanceUID = (activeViewport as any).displaySetInstanceUID;
    }

    if (!displaySetInstanceUID) {
      alert('No displaySetInstanceUID found for the active viewport');
      return;
    }

    // Get display set and metadata
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    const { PatientName, StudyDate } = displaySet || {};

    // Get image as JPEG
    const element = document.querySelector(`[data-viewport-uid="${activeViewportId}"] canvas`);
    if (!element) {
      alert('Could not find viewport canvas');
      return;
    }
    const imageBlob = await new Promise(resolve => element.toBlob(resolve, 'image/jpeg'));

    // Prepare metadata
    const metadata = {
      PatientName: PatientName || 'Unknown',
      StudyDate: StudyDate || 'Unknown',
    };

    // Create zip
    const JSZip = (await import('jszip')).default;
    const { saveAs } = fileSaver.saveAs;
    const zip = new JSZip();
    zip.file('image.jpg', imageBlob);
    zip.file('metadata.json', JSON.stringify(metadata, null, 2));
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Download
    saveAs(zipBlob, 'report.zip');
  };

  return (
    <Button
      variant="default"
      className="ohif-toolbar-button text-white"
      title="Export as Zip"
      onClick={handleExport}
      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Export as Zip
    </Button>
  );
}
