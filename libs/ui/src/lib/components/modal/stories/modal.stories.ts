import { ButtonComponent } from '@design-system/ui';
import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from '../modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'The title displayed in the modal header',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether clicking outside the modal will close it',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether pressing ESC key will close the modal',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: { type: 'radio' },
      description: 'The size of the modal',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    backdropType: {
      options: ['dimmed', 'blur', 'none'],
      control: { type: 'radio' },
      description: 'The type of backdrop displayed behind the modal',
      table: {
        defaultValue: { summary: 'dimmed' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button in the header',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    contentPadding: {
      control: 'boolean',
      description: 'Whether to add padding to the modal content area',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closed: {
      action: 'closed',
      description: 'Event emitted when the modal is closed',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog component that displays content in a layer above the page.',
      },
    },
  },
  // decorators: [
  //   (story) => ({
  //     template: `<div style="height: 400px; position: relative;"> {{story}} </div>`,
  //   }),
  // ],
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    open: false,
    title: 'Example Modal',
  },
  render: (args) => {
    let isOpen = true;
    return {
      imports: [ModalComponent, ButtonComponent],
      props: {
        isOpen: isOpen ?? false,
        title: args.title,
        toggleModal: () => {
          console.log('Toggle modal called');
          isOpen = !isOpen;
        },
      },
      template: `
      <button (click)="toggleModal()">Open Modal</button>
      {{isOpen ? 'Modal is open' : 'Modal is closed'}}
      <ds-ui-modal 
        [open]="isOpen" 
        (closed)="isOpen = false" 
        [title]="title">
        <p>This is an example modal dialog with some content inside. Modals are used to display content that requires user attention or interaction.</p>
        <div slot="footer">
          <button  (clicked)="isOpen = false">Cancel</button>
          <button (clicked)="isOpen = false">Confirm</button>
        </div>
      </ds-ui-modal>
    `,
    };
  },
};

// export const WithoutHeader: Story = {
//   args: {
//     open: false,
//     title: '',
//     showCloseButton: false,
//   },
//   render: (args) => ({
//     props: {
//       isOpen: args.open ?? false,
//       title: args.title,
//       showCloseButton: args.showCloseButton,
//       toggleModal: function () {
//         this['isOpen'] = !this['isOpen'];
//       },
//     },
//     template: `
//       <ds-ui-button (clicked)="toggleModal()">Open Modal (No Header)</ds-ui-button>
//       <ds-ui-modal
//         [open]="isOpen"
//         (closed)="isOpen = false"
//         [title]="title"
//         [showCloseButton]="showCloseButton">
//         <div style="text-align: center; padding: 20px 0;">
//           <h3>Confirmation Required</h3>
//           <p>Are you sure you want to proceed with this action?</p>
//           <div style="display: flex; justify-content: center; gap: 8px; margin-top: 20px;">
//             <ds-ui-button [variant]="'tertiary'" (clicked)="isOpen = false">Cancel</ds-ui-button>
//             <ds-ui-button (clicked)="isOpen = false">Confirm</ds-ui-button>
//           </div>
//         </div>
//       </ds-ui-modal>
//     `,
//     imports: [ModalComponent, ButtonComponent],
//   }),
// };

// export const SizesExample: Story = {
//   args: {
//     open: false,
//     title: 'Modal Size Example',
//   },
//   render: (args) => ({
//     props: {
//       openSm: false,
//       openMd: false,
//       openLg: false,
//       openFull: false,
//       title: args.title,
//     },
//     template: `
//       <div style="display: flex; gap: 8px;">
//         <ds-ui-button (clicked)="openSm = true">Small Modal</ds-ui-button>
//         <ds-ui-button (clicked)="openMd = true">Medium Modal</ds-ui-button>
//         <ds-ui-button (clicked)="openLg = true">Large Modal</ds-ui-button>
//         <ds-ui-button (clicked)="openFull = true">Full Screen Modal</ds-ui-button>
//       </div>

//       <ds-ui-modal
//         [open]="openSm"
//         (closed)="openSm = false"
//         [title]="'Small Modal'"
//         [size]="'sm'">
//         <p>This is a small modal dialog.</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openSm = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>

//       <ds-ui-modal
//         [open]="openMd"
//         (closed)="openMd = false"
//         [title]="'Medium Modal (Default)'"
//         [size]="'md'">
//         <p>This is a medium modal dialog (default size).</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openMd = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>

//       <ds-ui-modal
//         [open]="openLg"
//         (closed)="openLg = false"
//         [title]="'Large Modal'"
//         [size]="'lg'">
//         <p>This is a large modal dialog.</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openLg = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>

//       <ds-ui-modal
//         [open]="openFull"
//         (closed)="openFull = false"
//         [title]="'Full Screen Modal'"
//         [size]="'full'">
//         <p>This is a full screen modal dialog.</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openFull = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>
//     `,
//     imports: [ModalComponent, ButtonComponent],
//   }),
// };

// export const BackdropTypes: Story = {
//   args: {
//     open: false,
//     title: 'Backdrop Type Example',
//   },
//   render: (args) => ({
//     props: {
//       openDimmed: false,
//       openBlur: false,
//       openNone: false,
//       title: args.title,
//     },
//     template: `
//       <div style="display: flex; gap: 8px;">
//         <ds-ui-button (clicked)="openDimmed = true">Dimmed Backdrop</ds-ui-button>
//         <ds-ui-button (clicked)="openBlur = true">Blurred Backdrop</ds-ui-button>
//         <ds-ui-button (clicked)="openNone = true">No Backdrop</ds-ui-button>
//       </div>

//       <ds-ui-modal
//         [open]="openDimmed"
//         (closed)="openDimmed = false"
//         [title]="'Dimmed Backdrop'"
//         [backdropType]="'dimmed'">
//         <p>This modal has a dimmed backdrop (default).</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openDimmed = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>

//       <ds-ui-modal
//         [open]="openBlur"
//         (closed)="openBlur = false"
//         [title]="'Blurred Backdrop'"
//         backdropType="blur">
//         <p>This modal has a blurred backdrop.</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openBlur = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>

//       <ds-ui-modal
//         [open]="openNone"
//         (closed)="openNone = false"
//         [title]="'No Backdrop'"
//         [backdropType]="'none'">
//         <p>This modal has no visible backdrop.</p>
//         <div slot="footer">
//           <ds-ui-button (clicked)="openNone = false">Close</ds-ui-button>
//         </div>
//       </ds-ui-modal>
//     `,
//     imports: [ModalComponent, ButtonComponent],
//   }),
// };

// export const ComplexContent: Story = {
//   args: {
//     open: false,
//     title: 'User Profile',
//     size: 'md',
//   },
//   render: (args) => ({
//     props: {
//       isOpen: args.open ?? false,
//       title: args.title,
//       size: args.size,
//       toggleModal: function () {
//         this['isOpen'] = !this['isOpen'];
//       },
//     },
//     template: `
//       <ds-ui-button (clicked)="toggleModal()">Open Complex Modal</ds-ui-button>
//       <ds-ui-modal
//         [open]="isOpen"
//         (closed)="isOpen = false"
//         [title]="title"
//         [size]="size">
//         <div style="display: flex; flex-direction: column; gap: 16px;">
//           <div style="display: flex; gap: 16px; align-items: center;">
//             <div style="width: 64px; height: 64px; border-radius: 50%; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;">
//               <span class="material-icons">person</span>
//             </div>
//             <div>
//               <h3 style="margin: 0;">Jane Smith</h3>
//               <p style="margin: 0; color: #666;">Product Designer</p>
//             </div>
//           </div>

//           <div style="border-top: 1px solid #eee; padding-top: 16px;">
//             <h4>Contact Information</h4>
//             <p><strong>Email:</strong> jane.smith@example.com</p>
//             <p><strong>Phone:</strong> (555) 123-4567</p>
//             <p><strong>Location:</strong> San Francisco, CA</p>
//           </div>

//           <div style="border-top: 1px solid #eee; padding-top: 16px;">
//             <h4>Team Members</h4>
//             <ul>
//               <li>John Doe - Developer</li>
//               <li>Sarah Johnson - Product Manager</li>
//               <li>Michael Brown - UX Researcher</li>
//             </ul>
//           </div>
//         </div>
//         <div slot="footer">
//           <ds-ui-button [variant]="'tertiary'" (clicked)="isOpen = false">Close</ds-ui-button>
//           <ds-ui-button [variant]="'secondary'" (clicked)="isOpen = false">Edit Profile</ds-ui-button>
//           <ds-ui-button (clicked)="isOpen = false">Message</ds-ui-button>
//         </div>
//       </ds-ui-modal>
//     `,
//     imports: [ModalComponent, ButtonComponent],
//   }),
// };
