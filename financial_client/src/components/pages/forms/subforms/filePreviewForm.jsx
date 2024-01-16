import React from 'react';
import { Style, StyledTable, StyledTr, StyledTh, StyledTd, Button } from 'components/assets/localStyle';
import { deleteButtonStyle } from 'components/assets/globalStyle';


const FilePreviewForm = ({ files, handleDeleteFile }) => {
    return (
        <StyledTable style={Style.table}>
            <thead style={Style.thead}>
                <StyledTr>
                    <StyledTh style={Style.th}>File Name</StyledTh>
                    <StyledTh style={Style.th}>Import Date</StyledTh>
                    <StyledTh style={Style.th}>Delete</StyledTh>
                </StyledTr>
            </thead>
            <tbody>
                {files.map((file, index) => (
                    <StyledTr key={index} style={Style.tr}>
                        <StyledTd style={Style.StyledTd}>{file.filename}</StyledTd>
                        <StyledTd style={Style.StyledTd}>{file.filedate}</StyledTd>
                        <StyledTd style={Style.StyledTd}>
                            <Button style={deleteButtonStyle} onClick={() => handleDeleteFile(index)}>
                                Delete
                            </Button>
                        </StyledTd>
                    </StyledTr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default FilePreviewForm;