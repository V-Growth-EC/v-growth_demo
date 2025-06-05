// src/app/page.js
export default function Home() {
    return (
      <main className="is-login flex flex-center-middle">
        <section className="is-login-content">
          <h1>
            <img src="/images/common/logo.png" alt="ICT学習支援機器販売サイト" />
          </h1>
          <h2>ICT学習支援機器販売サイトへようこそ！</h2>
          <p className="lead">認証コードをご入力ください</p>
          <form className="form auth-form" action="/verify" method="POST">
            <div className="form-group">
              <input type="text" name="authCode" className="form-control" placeholder="認証コード" required />
            </div>
            <button type="submit" className="btn btn-primary">ログイン</button>
          </form>
          <p className="attention">
            本サイトは株式会社V-Growth向けのサイトです。<br className="sp" />
            事前に通知された認証コードをご入力ください。<br />
            一般の方はご利用いただけないクローズドサイトとなっております。
          </p>
        </section>
      </main>
    );
  }
  
  