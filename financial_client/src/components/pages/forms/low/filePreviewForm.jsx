import React from 'react';
import { Style, StyledTr, StyledTh, StyledTd } from 'components/assets/generalStyle';
import { DeleteButton } from 'components/assets/buttonAssets';
import { StyledTable } from 'components/assets/tableAssets';


const FilePreviewForm = ({ files, handleDeleteFile }) => {
    return (
        <StyledTable style={Style.table}>
            <thead style={Style.thead}>
                <StyledTr>
                    <StyledTh style={Style.th}>File Name</StyledTh>
                    <StyledTh style={Style.th}>Delete</StyledTh>
                </StyledTr>
            </thead>
            <tbody>
                {files.map((file, index) => (
                    <StyledTr key={index} style={Style.tr}>
                        <StyledTd style={Style.StyledTd}>{file.originalname}</StyledTd>
                        <StyledTd style={Style.StyledTd}>
                            <DeleteButton onClick={() => handleDeleteFile(index)}>
                                Delete
                            </DeleteButton>
                        </StyledTd>
                    </StyledTr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default FilePreviewForm;