import styled from 'styled-components';

export default styled.b`
font-family: "Anomalie Sans Black";
${({ color }) => (color ? `color: ${color};` : '')}
`;
