import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    
  } from '@chakra-ui/react';
  import React from "react";
  // import {Link} from "react-router-dom";
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  
   function WithSubnavigation() {



    const { isOpen, onToggle } = useDisclosure();
    let data1=localStorage.getItem("login_toggle");
    let data2=JSON.parse(localStorage.getItem("Data"));
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('f9f9f7')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'center' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
        <Link href="/"><img style={{height:"60px",width:"100px",borderRadius:"8px"}} src={process.env.PUBLIC_URL + '/logo.png'} alt="logo"/></Link>

            </Text>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={300}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
          style={{marginRight:"150px"}}
            flex={{ base: 1, md: 0, }}
            justify={'center'}
            direction={'row'}
            spacing={6}>


{
  data1? <h1>{data2.email}</h1>:<>
  
  <Button
            style={{border:"1px solid #1a2e44",width:"77px",color:"#1a2e44"}}
              as={'a'}
              fontSize={'sm'}
              fontWeight={600}
              variant={'link'}
              href={'/login'}>
              Log In
            </Button>

            <Link href="/signup">
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}

              color={'#ffffff'}
              bg={"#22d172"}
              // href={'/signup'}
              >
              Sign Up
            </Button>
            </Link>
  
  </>
}
             
            
            
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={700}
                  color={"#243f5c"}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel,logo_img }: NavItem) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{}}>

        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
            <img style={{height:"35px",width:"37px"}} src={logo_img} alt='logo'/>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={""} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    logo_img?:string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Email Testing',
      children: [
        {
          label: 'QA Automation',
          subLabel: 'Automation for Email Testing',
          href: '/auto',
          logo_img:'https://mailtrap.io/wp-content/uploads/2021/06/qa_automation_icon_menu.svg'
        },
        {
          label: 'HTML Check',
          subLabel: 'Find HTML/CSS Issues',
          href: '#',
          logo_img:'https://mailtrap.io/wp-content/uploads/2021/06/check_html_icon_menu.svg'
        },
        {
            label: 'Fake SMTP Server',
            subLabel: 'Your own SMTP Server',
            href: '#',
            logo_img:'https://mailtrap.io/wp-content/uploads/2021/06/fake_smtp_server_icon_menu.svg'
          },
          {
            label: 'Sandbox API',
            subLabel: 'Integerate with your application.',
            href: '#',
            logo_img:'https://mailtrap.io/wp-content/uploads/2021/06/api_icon_menu.svg'
          },
      ],
    },
    {
      label: 'Email API',
      href:'/email',
      logo_img:'#'
    },
    {
      label: 'Pricing',
      href: '/pricing',
      logo_img:'#'
    },
    {
      label: 'Resources',
      children: [
        {
          label: 'API',
          subLabel: 'Integerate with existing resources.',
          href: '#',
          logo_img:'https://mailtrap.io/wp-content/uploads/2022/06/Transactional-Email-Sending_icon-09.svg'
        },
        {
          label: 'Case Studies',
          subLabel: 'Success stories of our customers',
          href: '/tabs',
          logo_img:'https://mailtrap.io/wp-content/uploads/2022/06/Transactional-Email-Sending_icon-08.svg'
        },
        {
            label: 'Blogs',
            subLabel: 'The best content about emails.',
            href: '/blogs',
            logo_img:'https://mailtrap.io/wp-content/uploads/2022/06/Transactional-Email-Sending_icon-07.svg'
          },
          {
            label: 'Help',
            subLabel: "How-to's and knowledge base",
            href: '#',
            logo_img:'https://mailtrap.io/wp-content/uploads/2022/03/Transactional-Email-Sending_icon-06.svg'
          },
      ],
    },
  ];

  export default WithSubnavigation;