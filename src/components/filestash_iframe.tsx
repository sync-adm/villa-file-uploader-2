"use client";

import React, { useRef } from "react";

type Props = {
  instance: string;
};

export default function FilestashIframe({ instance }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <iframe
      ref={iframeRef}
      src={instance}
      style={{ height: "90vh", width: "100%" }}
      title="Filestash"
      allowFullScreen
    ></iframe>
  );
}
