<script setup lang="ts">
const { siteName } = useAppConfig();

useSeoMeta({
  title: `Privacy Policy | ${siteName}`,
  description: `Our privacy policy explains how we collect, use, and protect your personal information when you use our website and services.`,
  ogImage: '/images/placeholder.jpg',
});
</script>

<template>
  <main>
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p class="text-lg text-gray-600 mb-0">
            Last updated: {{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At {{ siteName }}, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          <p>
            This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our service to you:
          </p>
          <h3>2.1 Personal Data</h3>
          <p>
            While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Payment information</li>
            <li>Usage Data</li>
          </ul>
          
          <h3>2.2 Usage Data</h3>
          <p>
            We may also collect information on how the website is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
          </p>
          
          <h3>2.3 Tracking & Cookies Data</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
          
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our website when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To process and deliver orders</li>
          </ul>
          
          <h2>4. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>
          
          <h2>5. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our website, provide the service on our behalf, perform service-related services, or assist us in analyzing how our website is used.
          </p>
          <p>
            These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          
          <h2>6. Links to Other Sites</h2>
          <p>
            Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our website does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          
          <h2>9. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to request restriction of processing your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: privacy@example.com</li>
            <li>By phone: +1 (555) 123-4567</li>
            <li>By mail: 123 Commerce Street, Suite 100, New York, NY 10001</li>
          </ul>
          
          <div class="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 class="text-xl font-semibold mb-4">Your Consent</h3>
            <p class="mb-0">
              By using our website, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prose h2 {
  color: #1e40af;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.prose h3 {
  color: #2563eb;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.prose ul {
  margin-left: 1.5rem;
  list-style-type: disc;
}

.prose p {
  margin-bottom: 1rem;
}
</style> 
