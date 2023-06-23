import { Pagination } from "antd";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  // STATES

  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <>
      <Document
        file={file}
        onLoadSuccess={({ total }) => setNumPages(total > 0 ? total : 1)}
        error={
          <>
            <h3>Unable to display the PDF file.</h3>
            <a
              href={file}
              style={{ color: "#1890ff", textDecoration: "underline" }}
            >
              Open Manually.
            </a>
          </>
        }
      >
        <Page pageNumber={pageNumber} renderTextLayer={false} />
      </Document>

      <Pagination
        simple
        total={numPages}
        onChange={page => setPageNumber(page)}
      />
    </>
  );
};

export default PDFViewer;
