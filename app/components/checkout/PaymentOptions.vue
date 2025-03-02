<script setup lang="ts">
import { computed, toRef, onMounted } from 'vue';

// Add type definitions
interface PaymentGateway {
  id: string;
  title: string;
  description: string;
}

interface PaymentGateways {
  nodes: PaymentGateway[];
}

const props = defineProps<{
  modelValue: string | object;
  paymentGateways: PaymentGateways;
}>();

const paymentMethod = toRef(props, 'modelValue');
const activePaymentMethod = computed<PaymentGateway>(() => paymentMethod.value as PaymentGateway);
const emits = defineEmits(['update:modelValue']);

const updatePaymentMethod = (value: any) => {
  emits('update:modelValue', value);
};

onMounted(() => {
  if (props.paymentGateways?.nodes.length) updatePaymentMethod(props.paymentGateways?.nodes[0]);
});
</script> 
