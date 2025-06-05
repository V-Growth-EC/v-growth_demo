// src/components/Footer.tsx
const Footer = () => {
    return (
      <footer id="footer" className="footer footer-lower footer-login">
      <div className="footer-hdr flex-set">
        <p className="footer-hdr_seller">販売元：株式会社V-Growth</p>
        <nav className="footer-nav">
          <div>
            <ul className="footer-nav_lists flex">
              <li className="footer-nav_lists__item"><a href="/faq/">よくあるご質問</a></li>
              <li className="footer-nav_lists__item"><a href="/">商標</a></li>
              <li className="footer-nav_lists__item"><a href="/guidance/terms-of-service.html">利用規約</a></li>
              <li className="footer-nav_lists__item"><a href="/guidance/privacy-policy.html">プライバシーポリシー</a></li>
              <li className="footer-nav_lists__item"><a href="/guidance/transaction-law.html">特定商取引法に基づく表記</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="footer-ftr">
        <p className="copyright">&copy;V-Growth.</p>
      </div>
    </footer>
    );
  };
  
  export default Footer;