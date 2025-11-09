(function () {
  const container = document.getElementById("am-react-dashboard");
  const dataScript = document.getElementById("am-dashboard-json");
  if (!container || !dataScript || !window.React || !window.ReactDOM) {
    return;
  }

  let payload = {};
  try {
    payload = JSON.parse(dataScript.textContent);
  } catch (error) {
    console.error("Unable to parse dashboard payload", error);
  }

  const { useMemo } = React;
  const e = React.createElement;

  function StatCard({ title, value, caption }) {
    return e(
      "div",
      { className: "am-stat-card" },
      e("h3", null, title),
      e("div", { className: "am-stat-value" }, typeof value === "number" ? value : value || "—"),
      e("small", null, caption)
    );
  }

  function QuickAction({ icon, label, href }) {
    return e(
      "a",
      { href, className: "am-quick-action" },
      e("span", { className: "am-action-icon" }, icon),
      e("span", null, label)
    );
  }

  function ModelItem({ name, admin_url, add_url }) {
    const actions = [];
    if (add_url) {
      actions.push(
        e(
          "a",
          { key: "create", href: add_url, className: "am-badge" },
          "+ Créer"
        )
      );
    }
    if (admin_url) {
      actions.push(
        e(
          "a",
          { key: "open", href: admin_url, className: "am-badge" },
          "Voir"
        )
      );
    }

    return e(
      "li",
      { className: "am-model-item" },
      e("span", null, name),
      actions.length
        ? e("div", { className: "am-app-actions" }, actions)
        : null
    );
  }

  function AppCard({ name, models }) {
    return e(
      "article",
      { className: "am-app-card" },
      e(
        "h3",
        null,
        name,
        e(
          "span",
          { className: "am-badge" },
          `${models.length} modules`
        )
      ),
      e(
        "ul",
        null,
        models.map((model) =>
          e(ModelItem, {
            key: model.name,
            ...model,
          })
        )
      )
    );
  }

  function Dashboard({ data }) {
    const { quick_actions = [], stats = [], apps = [] } = data;

    const hasApps = useMemo(() => apps && apps.length > 0, [apps]);

    return e(
      "div",
      { className: "am-dashboard" },
      e(
        "section",
        { className: "am-hero" },
        e(
          "div",
          { className: "am-hero-content" },
          e("h1", null, "Centre de pilotage AllAdsMarket"),
          e(
            "p",
            null,
            "Gérez contenus, affiliation et SEO depuis un hub unique. Les APIs mises à jour sont directement consommées par le site React."
          ),
          quick_actions.length
            ? e(
                "div",
                { className: "am-quick-actions" },
                quick_actions.map((action) =>
                  e(QuickAction, { key: action.href, ...action })
                )
              )
            : null
        )
      ),
      stats.length
        ? e(
            "section",
            { className: "am-stat-grid" },
            stats.map((stat) =>
              e(StatCard, {
                key: stat.title,
                ...stat,
              })
            )
          )
        : null,
      hasApps
        ? e(
            "section",
            { className: "am-card-grid" },
            apps.map((app) =>
              e(AppCard, {
                key: app.app_label || app.name,
                ...app,
              })
            )
          )
        : e(
            "section",
            { className: "am-empty" },
            e("p", null, "Aucun module disponible pour l’instant.")
          )
    );
  }

  const root = ReactDOM.createRoot(container);
  root.render(e(React.StrictMode, null, e(Dashboard, { data: payload })));
})();

