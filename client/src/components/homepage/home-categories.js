export const HomeCategories = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button>Ghosts</button>
        <button>Aliens</button>
        <button>Cryptids</button>
        <button>Unexplained</button>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <h1>Pick from all kinds of categories</h1>
        <button>? What are these</button>
      </div>
    </div>
  );
}
