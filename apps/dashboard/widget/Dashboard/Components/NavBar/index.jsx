const { assets } = VM.require(`/*__@replace:widgetPath__*/.Config`);
const { NavBar } = VM.require(
  `/*__@replace:widgetPath__*/.Components.NavBar.styled`,
);

return (
  <NavBar>
    <a href={`//*__@replace:widgetPath__*/.App?page=home`}>
      <div className="d-flex gap-3 align-items-center">
        <img src={assets.logoWhite} />
        <div className="header-text">NDC DASHBOARD</div>
      </div>
    </a>
    <div className="color-text">FOR PEOPLE BY PEOPLE</div>
  </NavBar>
);
