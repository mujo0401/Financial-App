import React from 'react';

const DuplicationForm = ({ duplicateFiles }) => {
    return (
        duplicateFiles.length > 0 && (
            <div className="duplicate-files">
                <p>The following files were not added because they are duplicates:</p>
                <ul>
                    {duplicateFiles.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default DuplicationForm;