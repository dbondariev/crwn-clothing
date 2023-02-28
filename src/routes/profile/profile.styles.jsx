import styled from 'styled-components';


export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 80px;
    @media screen and (max-width: 800px) {
        padding: 10px;
    }
`;

export const Title = styled.h2`
    margin: 10px 0;
`;

export const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;