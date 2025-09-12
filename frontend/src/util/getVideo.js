const apiUrl = import.meta.env.VITE_SERVER_URL;

export const pollVideoStatus = (talkId, { onSuccess, onError }) => {
    const pollInterval = 5000;
    let timeoutId;
  
    const poll = async () => {
      try {
        const res = await fetch(`${apiUrl}/get-video/${talkId}`);
        const data = await res.json();
  
        console.log("Polling data:", data);
  
        if (data.status === "done" && data.result_url) {
          onSuccess?.(data);
          clearTimeout(timeoutId);
        } else if (data.status === "error") {
          onError?.(data);
          clearTimeout(timeoutId);
        } else {
          timeoutId = setTimeout(poll, pollInterval);
        }
      } catch (err) {
        console.error("Error polling:", err);
        onError?.(err);
        clearTimeout(timeoutId);
      }
    };
  
    poll();
  };
  
