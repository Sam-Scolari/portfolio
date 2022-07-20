export default function WorkLinkButton({ children, icon, ...props }) {
  return (
    <>
      <div>
        <img src={icon} />
        <button>{children}</button>
      </div>

      <style jsx>{`
        button {
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
