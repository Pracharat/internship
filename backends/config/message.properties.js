module.exports = {
  resMessage: {
    common: {
      success: {
        en: 'Transaction success.',
        th: 'ทำรายการสำเร็จ',
      },
      notFound: {
        en: 'Data Not Found.',
        th: 'ไม่พบข้อมูล',
      },
      error: {
        en: 'Sorry, The system is not available at this time.',
        th: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
      },
      requireField: {
        en: 'Invalid Data',
        th: 'ข้อมูล Data ไม่ถูกต้อง',
      }
    },
    authentication: {
      invalidData: {
        en: 'Invalid Data',
        th: 'ข้อมูล Data ไม่ถูกต้อง',
      },
      unAuthorized: {
        en: 'Unauthorized.',
        th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้',
      },

      forbidden: {
        en: 'Forbidden. please contact admin',
        th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้ กรุณาติดต่อ ผู้ดูแลระบบ',
      },

      notFound: {
        en: 'Service Missing / Not found. please contact admin.',
        th: 'ไม่พบบริการที่คุณร้องขอ กรุณาติดต่อ ผู้ดูแลระบบ',
      },
    },
    db: {
      connectionFail: {
        en: 'Failed to establish a connection to the database. Pleae try again later.',
        th: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้. กรุณาลองใหม่ภายหลัง',
      },
      databaseError: {
        en: 'Database error.',
        th: 'เกิดข้อผิดพลาดที่ฐานข้อมูล',
      },
    },
  },
};
