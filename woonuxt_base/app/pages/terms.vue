<script setup lang="ts">
const { siteName } = useAppConfig();

useSeoMeta({
  title: `Terms of Service | ${siteName}`,
  description: `Our terms of service outline the rules, guidelines, and legal agreements between our company and our customers.`,
  ogImage: '/images/placeholder.jpg',
});
</script>

<template>
  <main>
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
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
            Welcome to our website. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose or for any public display;</li>
            <li>Attempt to reverse engineer any software contained on our website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </p>
          
          <h2>3. Disclaimer</h2>
          <p>
            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
          </p>
          
          <h2>4. Limitations</h2>
          <p>
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p>
            Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
          </p>
          
          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice. However, we do not make any commitment to update the materials.
          </p>
          
          <h2>6. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
          </p>
          
          <h2>7. Modifications</h2>
          <p>
            We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
          
          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
          
          <h2>9. Privacy Policy</h2>
          <p>
            Your use of our website is also subject to our Privacy Policy, which is incorporated by reference into these Terms of Service. Please review our Privacy Policy to understand our practices regarding your personal information.
          </p>
          
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: support@example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Commerce Street, Suite 100, New York, NY 10001</li>
          </ul>
          
          <div class="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 class="text-xl font-semibold mb-4">Acceptance of Terms</h3>
            <p class="mb-0">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
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

.prose ul {
  margin-left: 1.5rem;
  list-style-type: disc;
}

.prose p {
  margin-bottom: 1rem;
}
</style> 
