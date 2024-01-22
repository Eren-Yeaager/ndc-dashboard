const { page, children } = props;
const { Wrapper, Container, Theme } = VM.require(
  `/*__@replace:widgetPath__*/.Layouts.styled`,
);

const [font, setFont] = useState("");

asyncFetch("https://fonts.cdnfonts.com/css/avenir-lt-pro").then((resp) =>
  setFont(resp.body),
);

return (
  <Theme font={font}>
    <Container>
      <Widget src={`/*__@replace:widgetPath__*/.Components.NavBar.index`} />
      {children}
    </Container>
  </Theme>
);
