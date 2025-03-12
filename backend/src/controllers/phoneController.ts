import { FastifyRequest, FastifyReply } from 'fastify';
import { PhoneService } from '../services/phoneService';

const phoneService = new PhoneService();

export async function getPhonesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const phones = await phoneService.getAllPhones();
    return reply.status(200).send({
      success: true,
      data: phones
    });
  } catch (error: any) {
    request.log.error(`Error fetching phones: ${error.message}`);
    return reply.status(500).send({
      success: false,
      data: [],
      error: 'Failed to fetch phones'
    });
  }
}

export async function getPhoneByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  
  try {
    const phone = await phoneService.getPhoneById(id);
    
    if (!phone) {
      return reply.status(404).send({
        success: false,
        data: null,
        error: `Phone with ID ${id} not found`
      });
    }
    
    return reply.status(200).send({
      success: true,
      data: phone
    });
  } catch (error: any) {
    request.log.error(`Error fetching phone ${id}: ${error.message}`);
    return reply.status(500).send({
      success: false,
      data: null,
      error: `Failed to fetch phone with ID ${id}`
    });
  }
}