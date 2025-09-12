import { useEffect, useState } from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./VoiceSelector.scss";
import boySrc from "../../../public/boy.png";
import girlSrc from "../../../public/girl.png";

interface Voice {
  voice_id: string;
  name: string;
  labels: {
    gender: string;
  };
}

interface VoiceSelectorProps {
  showError: boolean;
  onSelect: (voiceId: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  showError = false,
  onSelect = () => {},
}) => {
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  useEffect(() => {
    async function getVoicesList() {
      try {
        const res = await fetch(`${apiUrl}/get-voices`);
        const data = await res.json();
        if (data?.voices?.length) setVoices(data?.voices);
      } catch (error) {
        console.error(error);
      }
    }

    getVoicesList();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedVoice(event.target.value as string);
    onSelect(event.target.value);
  };

  return (
    <FormControl
      className="voice-selector-container"
      error={showError}
      fullWidth
    >
      {Boolean(voices?.length) && (
        <>
          <InputLabel id="demo-simple-select-label">Select Voice*</InputLabel>
          <Select
            labelId="voice-select-label"
            label="Select Voice"
            value={selectedVoice}
            onChange={handleChange}
            fullWidth
          >
            {voices?.map((voice) => (
              <MenuItem key={voice.voice_id} value={voice.voice_id}>
                <img
                  src={voice?.labels?.gender === "female" ? girlSrc : boySrc}
                  className="avatar-img"
                  alt="gender avatar logo"
                />
                {voice.name}
              </MenuItem>
            ))}
          </Select>
          {showError && <FormHelperText>Please select a voice</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default VoiceSelector;
