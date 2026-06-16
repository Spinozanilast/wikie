import ThemeToggle from "~/components/ThemeToggle";

function MainScreen() {
  return (
    <div className="relative">
      <ThemeToggle className="absolute top-2 right-2" />
      <h1>Wikie</h1>
    </div>
  );
}

export default MainScreen;
