import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="app-layout">

            <header className="topbar">
                <h2>TouraX</h2>
            </header>

            <div className="layout">

                <Sidebar />

                <main className="content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;