import { mountTemplateUrl } from '../utils/dom.js';
// Contact Page Component
export class ContactPage {
  constructor() {
    this.contactInfo = [
      {
        icon: '📱',
        title: '전화번호',
        value: '010-4695-9120',
        link: null,
        copyValue: '01046959120',
        expandable: false
      },
      {
        icon: '📧',
        title: '이메일',
        value: 'ansd43@gmail.com',
        link: 'mailto:ansd43@gmail.com',
        copyValue: 'ansd43@gmail.com'
      },
      {
        icon: '💼',
        title: 'GitHub',
        value: 'https://github.com/Byeong-Gwan',
        link: 'https://github.com/Byeong-Gwan',
        copyValue: 'https://github.com/Byeong-Gwan'
      }
    ];
  }

  async render() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Update page title
    document.title = '이력서-프로젝트 - Contact';
    // Mount external template-based markup
    await mountTemplateUrl('/templates/pages/contact.html', mainContent);
    // Render dynamic grid
    this.renderGrid();
    // Bind events
    this.attachEventListeners();
    this.initAnimations();
  }

  renderGrid() {
    const grid = document.getElementById('contact-grid');
    if (!grid) return;
    grid.innerHTML = this.contactInfo.map((item, index) => `
      <div class="contact-card fade-in" data-delay="${index * 0.1}">
        <div class="card-body">
          <div class="card-header contact-card-header">
            <div class="contact-icon">${item.icon}</div>
            <h3 class="contact-card-title" style="margin:0;">${item.title}</h3>
          </div>
          <div class="contact-card-content">
            ${item.link ? 
              `<a href="${item.link}" class="contact-link" target="_blank" rel="noopener noreferrer">
                <span class="link-text">${item.value}</span>
                <span class="link-arrow">→</span>
              </a>` : 
              `<span class="contact-value">${item.value}</span>`
            }
            <div class="contact-actions">
              ${item.title === '전화번호' ? `
                <button class="action-btn call-btn" data-phone="${item.copyValue}">📞 통화</button>
              ` : item.title === '이메일' ? `
                <button class="action-btn email-btn" data-email="${item.copyValue}">✉️ 메일</button>
              ` : `
                <button class="action-btn github-btn" data-url="${item.copyValue}">🔗 방문</button>
              `}
              <button class="copy-btn" data-copy="${item.copyValue}">📋 복사</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners() {
    this.setupCopyButtons();
  }

  setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textToCopy = button.getAttribute('data-copy');
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          this.showCopySuccess(button);
        } catch (err) {
          // Fallback for older browsers
          this.fallbackCopyTextToClipboard(textToCopy, button);
        }
      });
    });
  }

  setupExpandableContacts() {
    const expandableItems = document.querySelectorAll('.contact-item.expandable');
    expandableItems.forEach(item => {
      const preview = item.querySelector('.contact-preview');
      const expanded = item.querySelector('.contact-expanded');
      const arrow = item.querySelector('.expand-arrow');
      
      if (preview && expanded && arrow) {
        preview.style.cursor = 'pointer';
        preview.addEventListener('click', () => {
          const isExpanded = expanded.style.display !== 'none';
          
          if (isExpanded) {
            expanded.style.display = 'none';
            arrow.textContent = '▼';
            item.classList.remove('expanded');
          } else {
            expanded.style.display = 'block';
            arrow.textContent = '▲';
            item.classList.add('expanded');
          }
        });
      }
    });
  }

  fallbackCopyTextToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess(element);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      this.showCopyError(element);
    }
    
    document.body.removeChild(textArea);
  }

  showCopySuccess(element) {
    const originalText = element.textContent;
    const isButton = element.classList.contains('copy-btn');
    
    if (isButton) {
      element.innerHTML = '✓ 복사됨!';
      element.style.color = '#10b981';
      element.style.backgroundColor = '#f0fdf4';
      element.style.border = '1px solid #10b981';
      
      setTimeout(() => {
        element.innerHTML = originalText;
        element.style.color = '';
        element.style.backgroundColor = '';
        element.style.border = '';
      }, 2000);
    } else {
      // Show success message for contact item
      const successMsg = document.createElement('div');
      successMsg.className = 'copy-success-msg';
      successMsg.textContent = '전화번호가 복사되었습니다!';
      successMsg.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        animation: slideInOut 3s ease-in-out;
      `;
      
      element.style.position = 'relative';
      element.appendChild(successMsg);
      
      setTimeout(() => {
        if (successMsg.parentNode) {
          successMsg.parentNode.removeChild(successMsg);
        }
      }, 3000);
    }
  }

  showCopyError(element) {
    const isButton = element.classList.contains('copy-btn');
    
    if (isButton) {
      const originalText = element.textContent;
      element.innerHTML = '✗ 실패';
      element.style.color = '#ef4444';
      element.style.backgroundColor = '#fef2f2';
      element.style.border = '1px solid #ef4444';
      
      setTimeout(() => {
        element.innerHTML = originalText;
        element.style.color = '';
        element.style.backgroundColor = '';
        element.style.border = '';
      }, 2000);
    }
  }

  setupFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(e);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  async handleFormSubmit(e) {
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!this.validateForm(data)) {
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Simulate API call (replace with actual endpoint)
      await this.simulateFormSubmission(data);
      
      // Show success message
      this.showSuccessMessage();
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contact-form');

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      this.showFieldError(form.querySelector('#name'), '이름을 2글자 이상 입력해주세요.');
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      this.showFieldError(form.querySelector('#email'), '올바른 이메일 주소를 입력해주세요.');
      isValid = false;
    }

    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
      this.showFieldError(form.querySelector('#subject'), '제목을 5글자 이상 입력해주세요.');
      isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
      this.showFieldError(form.querySelector('#message'), '메시지를 10글자 이상 입력해주세요.');
      isValid = false;
    }

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
      case 'text':
        if (field.id === 'name' && value.length < 2) {
          errorMessage = '이름을 2글자 이상 입력해주세요.';
          isValid = false;
        } else if (field.id === 'subject' && value.length < 5) {
          errorMessage = '제목을 5글자 이상 입력해주세요.';
          isValid = false;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = '올바른 이메일 주소를 입력해주세요.';
          isValid = false;
        }
        break;
      case 'textarea':
        if (value.length < 10) {
          errorMessage = '메시지를 10글자 이상 입력해주세요.';
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  showSuccessMessage() {
    const successElement = document.getElementById('form-success');
    if (successElement) {
      successElement.classList.add('show');
      
      // Hide after 5 seconds
      setTimeout(() => {
        successElement.classList.remove('show');
      }, 5000);
    }
  }

  showErrorMessage(message) {
    // You can implement a toast notification or error display here
    alert(message);
  }

  async simulateFormSubmission(data) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve();
      }, 1500);
    });
  }

  initAnimations() {
    // Add staggered animation delay to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation delay to social items
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach((item, index) => {
      item.style.animationDelay = `${(index + contactItems.length) * 0.1}s`;
    });

    // Trigger scroll check for animations
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }

  cleanup() {
    // Clear any timeouts or intervals
    const successElement = document.getElementById('form-success');
    if (successElement) {
      successElement.classList.remove('show');
    }
  }
}
