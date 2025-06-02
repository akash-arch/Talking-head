import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./GenerateVideo.scss";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import VoiceSelector from "../../components/VoiceSelector/VoiceSelector";

interface ErrorState {
  inputText: boolean;
  voice: boolean;
}

const initialErrorState = {
  inputText: false,
  voice: false,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const GenerateVideo = () => {
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const { hasFace, resetHasFace, detectFace } = useFaceDetection();

  const [inputText, setInputText] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<ErrorState>(initialErrorState);

  const showImageError = hasFace === false && imagePreview;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      if (previewUrl) detectFace(previewUrl);
    }
  };

  const handleCloseIconClick = () => {
    setImagePreview(null);
    resetHasFace();
  };

  const handleFormSubmit = async () => {
    if (!inputText) {
      return setError({
        ...error,
        inputText: true,
      });
    } else if (!voiceId) {
      return setError({
        inputText:false,
        voice: true,
      });
    } else {
      setError(initialErrorState);
      try {
        const res = await fetch(`${apiUrl}/tts`, {
          method: "POST",
          body: JSON.stringify({ text: inputText }),
          headers: { "Content-Type": "application/json" },
        });

        const blob = await res?.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <>
      <h2 className="top-most-heading">
        Talking Photo Free - Bring Photos to Life
      </h2>
      <h4 className="instructions-text">
        Make your realistic talking photo online free with efficiency. Upload a
        photo, input text and create a talking photo AI online.
      </h4>

      <div className="generate-video-container">
        <div className="input-form-wrapper">
          <div>
            <TextField
              error={error.inputText}
              id="input-text-for-speech"
              label="Input text for speech"
              variant="outlined"
              minRows={3}
              required
              multiline
              fullWidth
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value);
              }}
              helperText={error.inputText && "Please enter text"}
            />
            <VoiceSelector
              showError={error.voice}
              onSelect={(val) => setVoiceId(val)}
            />
          </div>
          <div className="generate-video-btn-wrapper">
            {audioUrl && (
              <AudioPlayer
                src={audioUrl}
                autoPlay={false}
                onPlay={() => console.log("Audio started")}
                onEnded={() => console.log("Audio ended")}
                showJumpControls={false}
                layout="horizontal"
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              className="generate-video-btn"
            >
              Generate Video
            </Button>
          </div>
        </div>
        <div className="upload-section">
          <div
            className={`file-uploader-wrapper ${
              showImageError && "add-error-styles"
            }`}
          >
            {imagePreview ? (
              <>
                <HighlightOffIcon
                  className="close-icon"
                  onClick={handleCloseIconClick}
                />
                <img
                  src={imagePreview}
                  alt="Selected preview"
                  className={`preview-image ${
                    showImageError && "add-error-styles"
                  }`}
                />
              </>
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload photo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />
              </Button>
            )}
          </div>
          {showImageError && (
            <p className="no-face-detected-error">
              No face found
              <br />
              Please upload an image with a face
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GenerateVideo;
