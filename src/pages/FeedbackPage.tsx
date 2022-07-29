import { useEffect, useState } from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../utils/constants"
import { ACButton, ACInput, ACTextArea } from "../components/styled-components"
import NavBar from "../components/NavBar"
import { giveFeedback } from "../queries/feedback"

export default function FeedbackPage() {
  const [nameValue, setNameValue] = useState<string>("")
  const [messageValue, setMessageValue] = useState<string>("")
  const [feedbackStatus, setFeedbackStatus] = useState<string>("idle")

  useEffect(() => {
    if (feedbackStatus === "sent" && messageValue) {
      setFeedbackStatus("idle")
    }
  }, [messageValue, feedbackStatus])

  const handleSendFeedback = () => {
    if (messageValue) {
      setFeedbackStatus("sending")
      giveFeedback({ name: nameValue, message: messageValue }).then(res => {
        if (res && res.message) {
          setNameValue("")
          setMessageValue("")
          setFeedbackStatus("sent")
        } else setFeedbackStatus("error")
      })
    }
  }

  return (
    <Wrapper>
      <NavBar />
      <Container>
        <ACInput
          placeholder="Name (optional)"
          value={nameValue}
          onChange={e => setNameValue(e.target.value)}
        />
        <ACTextArea
          placeholder={`Type here \n\n If it is a bug report please be as specific as you can describing the situation, current view, etc. \n Thanks for your feedback!`}
          value={messageValue}
          onChange={e => setMessageValue(e.target.value)}
        />
        <ACButton onClick={handleSendFeedback} fWeight="bold">
          {feedbackStatus === "sending"
            ? ". . ."
            : feedbackStatus === "sent"
            ? "Thanks!"
            : feedbackStatus === "error"
            ? "Please try later"
            : "Send"}
        </ACButton>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-image: url(/images/welcome-background.png);
  background-repeat: round;
  height: 100vh;
  width: 100%;
`
const Container = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 700px;
  padding-top: 120px;
  margin: 0 auto;
  ${BREAKPOINTS.MOBILE} {
    width: calc(100% - 40px);
  }
`
