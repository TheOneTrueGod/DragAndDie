import React from 'react';
import styled from 'styled-components';
const StyledCell = styled.div<{ dark?: boolean }>`
    background-color: ${props => props.dark ? "rgb(240, 217, 181)" : "rgb(181, 136, 99)"};
    padding: 4px;
`;

type Props = { dark?: boolean, className: string, children?: React.ReactNode };

export default function Cell({ dark, className, children }: Props) {
    return (
        <StyledCell dark={dark} className={className} >
            { children }
        </StyledCell>
    );
}