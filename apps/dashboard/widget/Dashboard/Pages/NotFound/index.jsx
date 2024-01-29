
const { assets, socialLinks } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { Text, Logo, Social } = VM.require(
  `/*__@replace:widgetPath__*/.Pages.NotFound.styled`,
);

if (!Text || !Logo || !Social || !assets || !socialLinks)
  return <Widget src="flashui.near/widget/Loading" />;

return (
  <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
    <Text>
      Oops! Looks like we lost this page in the virtual cosmos. Don't worry! Go back to the main page and try again. If this happens again, let us know, and we'll send a search robot with a flashlight!
    </Text>
    <Logo src={assets.notFoundLogo} />
    <Text>
      Join to our social
    </Text>
    <Social>
      <a href={socialLinks.near} target="_blank">
        <img src={assets.nearLogo} />
      </a>
      <a href={socialLinks.twitter} target="_blank">
        <img src={assets.twitterLogo} />
      </a>
      <a href={socialLinks.telegram} target="_blank">
        <img src={assets.telegramLogo} />
      </a>
    </Social>
  </div>
);