import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
    @font-face{
        font-family: 'Roboto';
        src: local('Roboto');
        unicode-range: U+0041-005A, U+0061-007A;
    }
    @font-face{
        font-family: 'Noto Sans KR';
        src: local('Noto Sans KR');
        unicode-range: U+AC00-U+D7A3;
    }
    body{
        font-family: 'Noto Sans KR', 'Roboto';
    }
    a{
        text-decoration: none;
    }
`;
