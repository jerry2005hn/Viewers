# OHIF Export Extension

**Developer:** Jerry Nguyen

This OHIF extension provides functionality to export viewport images along with their metadata as a ZIP file. The extension adds a toolbar button that, when clicked, captures the current viewport image as a JPEG and packages it with extracted DICOM metadata in a downloadable ZIP file.

## Features

- **Export Button**: I used the 'clipboard' icon from ohif ui icons since I could not find a 'download' icon
- **Image Capture**: Captures the current viewport as a high-quality JPEG image
- **Metadata Extraction**: Extracts PatientName and StudyDate from DICOM metadata
- **ZIP Creation**: Uses JSZip to create a client-side ZIP file containing:
  - `image.jpg` - The captured viewport image
  - `metadata.json` - JSON file with extracted metadata
- **Download Trigger**: Automatically triggers browser download of `report.zip`

## Installation Instructions

### Prerequisites
- Yarn
- Git

### Step 1: Clone OHIF Viewer Repository

```bash
git clone https://github.com/jerry2005hn/Viewers.git
cd Viewers
```

### Step 2: Install Dependencies on root

```bash
yarn install
```

### Step 3: Install Dependencies on zip-extension

```bash
cd zip-extension
yarn install
```

### Step 4: Install Dependencies on zip-mode

```bash
cd zip-mode
yarn install
```

### Step 5: Link the zip-mode

```bash
yarn cli link-mode <packageDir>
yarn install
```

### Step 6: Link the zip-extension

```bash
yarn cli link-extension <packageDir>
yarn install
```

### Step 6: Run

```bash
yarn start
```

The application will be available at `http://localhost:3000`

## Usage Instructions

### Using the Export Feature

1. Load the OHIF Viewer in your browser
2. Load a study
3. In the mode selector, select "Zip Mode"
4. Navigate to the image you want to export using the normal OHIF navigation tools
5. Click the "Export ZIP" button in the toolbar (clipboard icon)
6. The system will:
   - Capture the current viewport as a JPEG image
   - Extract PatientName and StudyDate from the DICOM metadata
   - Create a ZIP file containing both files
   - Automatically download the `report.zip` file

### ZIP File Contents

The downloaded `report.zip` will contain:
- **image.jpg**: The captured viewport image in JPEG format
- **metadata.json**: JSON file with extracted metadata including:
  - PatientName
  - StudyDate
  - viewportId
  - displaySetInstanceUID

## Development Process

### Approach Taken

1. **Research Phase**: Studied existing OHIF repository with mentioned extensions (cornerstone, dicom-pdf) to understand the architecture. Looked at the online documentation with online tutorials on the page.
2. **Implementation**: Followed the tutorials and documentation. Used the yarn cli to create the extension and mode for ease.

### Challenges Encountered and Solutions

1. **Zip Feature**:
   - **Challenge**: The zip feature was new to me and there were some problems importing it
   - **Solution**: Research online, found some resources on stackoverflow

2. **Toolbar Integration**:
   - **Challenge**: Adding custom buttons to the OHIF toolbar system
   - **Solution**: Research online, saw a post on GitHub by the developing team of OHIF that was quite useful. I also joined their Slack community and asked for help but no one answered 😭 Decided to follow the cornerstone extension.

### Assumptions Made

1. **Image Format**: Assumed JPEG format is acceptable for medical imaging export
2. **Metadata Requirements**: Focused on PatientName and StudyDate as specified, but included additional context metadata like viewportId and displaySetInstanceUID

### Features I Would Add With More Time

1. **Configuration Options**:
   - Selectable image formats (PNG, TIFF, DICOM)
   - Configurable image quality settings
   - Custom metadata field selection

3. **User Experience/User Interface Improvements**:
   - Find a different icon that would suit the Zip feature

3. **Implement Testing**:
   - Write tests for the extension
