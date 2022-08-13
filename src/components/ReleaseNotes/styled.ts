import styled from "styled-components"

export const NotesWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.$4};
  margin-top: ${({ theme }) => theme.$1};
  width: 100%;
  > hr {
    border-color: ${({ theme }) => theme.secondary_brown};
    width: 85%;
  }
`

export const NotesContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.$7} 0;
  width: 100%;
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: ${({ theme }) => theme.$4};
  margin: 0 0 ${({ theme }) => theme.$4};
`

export const Subtitle = styled.h3`
  font-weight: bold;
  font-size: ${({ theme }) => theme.$5};
  margin: 0 0 ${({ theme }) => theme.$4};
`
