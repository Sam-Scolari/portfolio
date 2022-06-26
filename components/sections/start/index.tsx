import Greeting from "./Greeting";
import Connect from "./Connect";

export default function StartPage({ setWasPressed }) {
  return (
    <section>
      <div>
        <Greeting />
      </div>
      <Connect setWasPressed={setWasPressed} />
      <style jsx>{``}</style>
    </section>
  );
}
