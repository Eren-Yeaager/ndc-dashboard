const { page, ...passProps } = props;
if (!page) page = "home";

function Page() {
  switch (page) {
    case "home": {
      return (
        <Widget
          src={`/*__@replace:widgetPath__*/.Pages.Home`}
          props={passProps}
        />
      );
    }

    default: {
      return (
        <Widget
          src={`/*__@replace:widgetPath__*/.Pages.NotFound.index`}
          props={passProps}
        />
      );
    }
  }
}

return (
  <Widget
    src={`/*__@replace:widgetPath__*/.Layouts.App`}
    props={{ page, children: <Page /> }}
  />
);
