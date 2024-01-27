// FilePreviewForm.js
import React from 'react';
import { Style, StyledTr, StyledTh, StyledTd } from 'components/assets/generalStyle';
import { DeleteButton, Button } from 'components/assets/buttonAssets';
import { StyledTable } from 'components/assets/tableAssets';

const FilePreviewForm = ({ files, handleDeleteFile, onConsumeFiles }) => {
    return (
        <div>
            <StyledTable style={Style.table}>
                <thead style={Style.thead}>
                    <StyledTr>
                        <StyledTh style={Style.th}>File Name</StyledTh>
                        <StyledTh style={Style.th}>Status</StyledTh>
                        <StyledTh style={Style.th}>Actions</StyledTh>
                    </StyledTr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <StyledTr key={index} style={Style.tr}>
                            <StyledTd style={Style.StyledTd}>{file.filename}</StyledTd>
                            <StyledTd style={Style.StyledTd}>
                                {file.messageType === 'Duplication_Error' ? <span style={{ color: 'red' }}>Duplicate</span> : 'Ready'}
                            </StyledTd>
                            <StyledTd style={Style.StyledTd}>
                                <DeleteButton onClick={() => handleDeleteFile(index)}>
                                    Delete
                                </DeleteButton>
                            </StyledTd>
                        </StyledTr>
                    ))}
                </tbody>
                <tfoot>
                    <StyledTr>
                        <StyledTd colSpan="3" style={{textAlign: 'right'}}>
                            <Button onClick={onConsumeFiles}>Consume File(s)</Button>
                        </StyledTd>
                    </StyledTr>
                </tfoot>
            </StyledTable>
        </div>
    );
};

export default FilePreviewForm;