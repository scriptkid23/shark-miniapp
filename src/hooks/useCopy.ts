import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

interface UseCopyWithFeedbackOptions {
    duration?: number; // Thời gian hiển thị trạng thái "Copied!" (ms)
}

export const useCopy = (
    options: UseCopyWithFeedbackOptions = { duration: 2000 }
) => {
    const { duration } = options;
    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, copy] = useCopyToClipboard();

    const handleCopy = (text: string) => {
        copy(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), duration);
            })
            .catch((err) => console.error("Failed to copy text:", err));
    };

    return { copy: handleCopy, isCopied, copiedText };
};
