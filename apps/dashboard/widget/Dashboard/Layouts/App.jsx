let fontCss = fetch("https://fonts.cdnfonts.com/css/avenir-lt-pro");

if (!fontCss) {
  function AppLayout({ page, children }) {
    return <></>;
  }
  return { AppLayout };
}
fontCss = fontCss.body;
const { contentContainer,  container } = VM.require(`/*__@replace:widgetPath__*/.Layouts.styled`);

const Theme = styled.div`
  font-weight: 500;
  font-family: "Avenir LT Pro", sans-serif;
  ${fontCss};
  font-style: normal;
  background: #e8ecf0 !important;
`;

const Container = styled.div`${container}`;
const ContentContainer = styled.div`${contentContainer}`;

function AppLayout({ page, children }) {
  return (
    <Theme>
      <Container>
        <Widget src={`/*__@replace:widgetPath__*/.Components.NavBar.index`} />
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </Theme>
  );
}

return { AppLayout };
