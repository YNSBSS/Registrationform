import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentView, setCurrentView] = useState('form');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  const translations = {
    en: {
      welcomeTitle: 'Welcome',
      welcomeSubtitle: 'Join our community and unlock endless possibilities',
      secure: 'Secure & Private',
      easyToUse: 'Easy to Use',
      support: '24/7 Support',
      createAccount: 'Create Account',
      fillDetails: 'Fill in your details to get started',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccountBtn: 'Create Account',
      creatingAccount: 'Creating Account...',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      atLeast3Chars: 'At least 3 characters',
      lettersOnly: 'Letters only',
      validEmail: 'Please enter a valid email address',
      atLeast8Chars: 'At least 8 characters',
      oneUppercase: 'One uppercase letter',
      oneLowercase: 'One lowercase letter',
      oneNumber: 'One number',
      oneSpecial: 'One special character',
      passwordsMatch: 'Passwords match',
      successTitle: 'Account Created Successfully!',
      successSubtitle: 'Welcome to our platform. Your account is ready to use.',
      continueBtn: 'Continue to Profile',
      memberSince: 'Member Since',
      accountStatus: 'Account Status',
      security: 'Security',
      active: 'Active',
      verified: 'Verified',
      accountInfo: 'Account Information',
      accountType: 'Account Type',
      standardUser: 'Standard User',
      twoFactorAuth: 'Two-Factor Auth',
      enabled: 'Enabled',
      editProfile: 'Edit Profile',
      settings: 'Settings',
      passwordStrength: 'Password Strength'
    },
    ar: {
      welcomeTitle: 'مرحباً',
      welcomeSubtitle: 'انضم إلى مجتمعنا وافتح إمكانيات لا حصر لها',
      secure: 'آمن وخاص',
      easyToUse: 'سهل الاستخدام',
      support: 'دعم 24/7',
      createAccount: 'إنشاء حساب',
      fillDetails: 'املأ بياناتك للبدء',
      fullName: 'الاسم الكامل',
      emailAddress: 'عنوان البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      createAccountBtn: 'إنشاء حساب',
      creatingAccount: 'جاري إنشاء الحساب...',
      alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      atLeast3Chars: 'على الأقل 3 أحرف',
      lettersOnly: 'حروف فقط',
      validEmail: 'يرجى إدخال بريد إلكتروني صالح',
      atLeast8Chars: 'على الأقل 8 أحرف',
      oneUppercase: 'حرف كبير واحد',
      oneLowercase: 'حرف صغير واحد',
      oneNumber: 'رقم واحد',
      oneSpecial: 'رمز خاص واحد',
      passwordsMatch: 'كلمات المرور متطابقة',
      successTitle: 'تم إنشاء الحساب بنجاح!',
      successSubtitle: 'مرحباً بك في منصتنا. حسابك جاهز للاستخدام.',
      continueBtn: 'متابعة إلى الملف الشخصي',
      memberSince: 'عضو منذ',
      accountStatus: 'حالة الحساب',
      security: 'الأمان',
      active: 'نشط',
      verified: 'موثق',
      accountInfo: 'معلومات الحساب',
      accountType: 'نوع الحساب',
      standardUser: 'مستخدم عادي',
      twoFactorAuth: 'المصادقة الثنائية',
      enabled: 'مفعل',
      editProfile: 'تعديل الملف الشخصي',
      settings: 'الإعدادات',
      passwordStrength: 'قوة كلمة المرور'
    }
  };

  const t = translations[language];

  const passwordValidation = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*()/,.?":{}|<>]/.test(formData.password)
  };

  const emailValidation = {
    format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  };

  const nameValidation = {
    length: formData.name.trim().length >= 3,
    format: /^[a-zA-Z\s\u0600-\u06FF]+$/.test(formData.name)
  };

  const allPasswordValid = Object.values(passwordValidation).every(v => v);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const isFormValid = 
    nameValidation.length && 
    nameValidation.format &&
    emailValidation.format && 
    allPasswordValid && 
    passwordsMatch;

  const getPasswordStrength = () => {
    const validCount = Object.values(passwordValidation).filter(v => v).length;
    if (validCount === 0) return { level: 0, text: '', color: '' };
    if (validCount <= 2) return { level: 1, text: 'Weak', color: '#ef4444' };
    if (validCount <= 3) return { level: 2, text: 'Fair', color: '#f59e0b' };
    if (validCount <= 4) return { level: 3, text: 'Good', color: '#3b82f6' };
    return { level: 4, text: 'Strong', color: '#10b981' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
    }, 2000);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    setCurrentView('profile');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (currentView === 'profile') {
    return <ProfilePage userData={formData} language={language} theme={theme} t={t} toggleLanguage={toggleLanguage} toggleTheme={toggleTheme} />;
  }

  const strength = getPasswordStrength();

  return (
    <div className={`app-container ${theme} ${language}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      <div className="left-section">
        <div className="image-overlay"></div>
        <div className="image-content">
          <h1 className="image-title">{t.welcomeTitle}</h1>
          <p className="image-subtitle">{t.welcomeSubtitle}</p>
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>{t.secure}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>{t.easyToUse}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>{t.support}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="controls">
          <button className="control-btn" onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="control-btn" onClick={toggleLanguage} title={language === 'en' ? 'العربية' : 'English'}>
            {language === 'en' ? 'ع' : 'EN'}
          </button>
        </div>

        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="form-title">{t.createAccount}</h2>
            <p className="form-description">{t.fillDetails}</p>
          </div>

          <div className="form-content">
            <div className="input-group">
              <label className="input-label">{t.fullName}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                className={`input-field ${touched.name && !nameValidation.length ? 'input-error' : ''}`}
                placeholder={language === 'en' ? 'Younes bss' : 'محمد أحمد'}
              />
              {touched.name && (
                <div className="validation-hints-compact">
                  <div className={`hint-compact ${nameValidation.length ? 'valid' : 'invalid'}`}>
                    <span className="hint-icon-compact">{nameValidation.length ? '✓' : '×'}</span>
                    {t.atLeast3Chars}
                  </div>
                  <div className={`hint-compact ${nameValidation.format ? 'valid' : 'invalid'}`}>
                    <span className="hint-icon-compact">{nameValidation.format ? '✓' : '×'}</span>
                    {t.lettersOnly}
                  </div>
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">{t.emailAddress}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`input-field ${touched.email && !emailValidation.format ? 'input-error' : ''}`}
                placeholder="younes@gmail.com"
              />
              {touched.email && !emailValidation.format && (
                <div className="validation-hints-compact">
                  <div className="hint-compact invalid">
                    <span className="hint-icon-compact">×</span>
                    {t.validEmail}
                  </div>
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">{t.password}</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleBlur('password')}
                  className="input-field"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <>
                  <div className="password-strength-bar">
                    <div className="strength-segments">
                      {[1, 2, 3, 4].map(segment => (
                        <div 
                          key={segment}
                          className={`strength-segment ${segment <= strength.level ? 'active' : ''}`}
                          style={{ backgroundColor: segment <= strength.level ? strength.color : '' }}
                        />
                      ))}
                    </div>
                    {strength.level > 0 && (
                      <span className="strength-text" style={{ color: strength.color }}>
                        {strength.text}
                      </span>
                    )}
                  </div>
                  <div className="validation-grid">
                    <div className={`grid-hint ${passwordValidation.length ? 'valid' : 'invalid'}`}>
                      <span className="grid-icon">{passwordValidation.length ? '✓' : '×'}</span>
                      <span className="grid-text">8+ chars</span>
                    </div>
                    <div className={`grid-hint ${passwordValidation.uppercase ? 'valid' : 'invalid'}`}>
                      <span className="grid-icon">{passwordValidation.uppercase ? '✓' : '×'}</span>
                      <span className="grid-text">A-Z</span>
                    </div>
                    <div className={`grid-hint ${passwordValidation.lowercase ? 'valid' : 'invalid'}`}>
                      <span className="grid-icon">{passwordValidation.lowercase ? '✓' : '×'}</span>
                      <span className="grid-text">a-z</span>
                    </div>
                    <div className={`grid-hint ${passwordValidation.number ? 'valid' : 'invalid'}`}>
                      <span className="grid-icon">{passwordValidation.number ? '✓' : '×'}</span>
                      <span className="grid-text">0-9</span>
                    </div>
                    <div className={`grid-hint ${passwordValidation.special ? 'valid' : 'invalid'}`}>
                      <span className="grid-icon">{passwordValidation.special ? '✓' : '×'}</span>
                      <span className="grid-text">!@#$</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">{t.confirmPassword}</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`input-field ${touched.confirmPassword && !passwordsMatch ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {touched.confirmPassword && formData.confirmPassword && (
                <div className="validation-hints-compact">
                  <div className={`hint-compact ${passwordsMatch ? 'valid' : 'invalid'}`}>
                    <span className="hint-icon-compact">{passwordsMatch ? '✓' : '×'}</span>
                    {t.passwordsMatch}
                  </div>
                </div>
              )}
            </div>

            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader-container">
                  <div className="spinner"></div>
                  <span>{t.creatingAccount}</span>
                </div>
              ) : (
                t.createAccountBtn
              )}
            </button>

            <div className="form-footer">
              <p>{t.alreadyHaveAccount} <a href="#" className="link">{t.signIn}</a></p>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <ConfirmationPopup 
          onConfirm={handleConfirm}
          t={t}
          theme={theme}
        />
      )}
    </div>
  );
};

const ConfirmationPopup = ({ onConfirm, t, theme }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup-container ${theme}`}>
        <div className="popup-icon">
          <div className="success-checkmark">✓</div>
        </div>
        <h2 className="popup-title">{t.successTitle}</h2>
        <p className="popup-subtitle">{t.successSubtitle}</p>

        <div className="popup-actions">
          <button className="popup-btn primary" onClick={onConfirm}>
            {t.continueBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ userData, language, theme, t, toggleLanguage, toggleTheme }) => {
  const registrationDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`profile-container ${theme} ${language}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="controls">
        <button className="control-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="control-btn" onClick={toggleLanguage}>
          {language === 'en' ? 'ع' : 'EN'}
        </button>
      </div>

      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {userData.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <h1 className="profile-name">{userData.name}</h1>
        <p className="profile-email">{userData.email}</p>
        
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <span className="stat-label">{t.memberSince}</span>
              <span className="stat-value">{registrationDate}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-label">{t.accountStatus}</span>
              <span className="stat-value">{t.active}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-info">
              <span className="stat-label">{t.security}</span>
              <span className="stat-value">{t.verified}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">{t.accountInfo}</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{t.fullName}</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.emailAddress}</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.accountType}</span>
              <span className="info-value">{t.standardUser}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.twoFactorAuth}</span>
              <span className="info-value">{t.enabled}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn primary">{t.editProfile}</button>
          <button className="action-btn secondary">{t.settings}</button>
        </div>
      </div>
    </div>
  );
};

export default App;