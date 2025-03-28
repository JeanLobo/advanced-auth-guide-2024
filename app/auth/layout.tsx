const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // Removendo o background e gradiente, pois cada página agora tem seu próprio layout
  return (
    <div className="h-full">
      {children}
    </div>
  );
}
 
export default AuthLayout;