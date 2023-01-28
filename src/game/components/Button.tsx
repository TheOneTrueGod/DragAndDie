import styled from "styled-components";
import React from "react";

const StyledButton = styled.button`
margin-top: 8px;
border: none;
padding: 16px;
border-radius: 8px;
font-size: 16px;
cursor: pointer;
background: lightgreen;
:active {
    background: green;
}
`;

type Props = {};
type State = {};

export default class Button extends React.Component<Props, State> {
    render() {
        return <StyledButton>{this.props.children}</StyledButton>;
    }
}